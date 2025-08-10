pipeline {
  agent any

  environment {
    AWS_REGION = 'ap-south-1'
    AWS_ACCOUNT_ID = '577638372377'
    ECR_REPO = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/portfolio"
    ECS_CLUSTER = 'portfolio-cluster'         
    ECS_SERVICE = 'portfolio-service'         
    TASK_FAMILY = 'portfolio-task'             

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Build App') {
      steps {
        sh '''
          npm ci
          npm run build
        '''
      }
    }

    stage('Build & Push Image') {
      steps {
        script {
          // get short commit SHA as tag
          GIT_SHA = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
          IMAGE_URI = "${env.ECR_REPO}:${GIT_SHA}"
          env.IMAGE_URI = IMAGE_URI

          // login and push
          withAWS(credentials: 'aws-ecr-creds', region: "${env.AWS_REGION}") {
            sh """
              aws ecr get-login-password --region ${env.AWS_REGION} | docker login --username AWS --password-stdin ${env.AWS_ACCOUNT_ID}.dkr.ecr.${env.AWS_REGION}.amazonaws.com
              docker build -t portfolio:${GIT_SHA} .
              docker tag portfolio:${GIT_SHA} ${IMAGE_URI}
              docker push ${IMAGE_URI}
            """
          }
        }
      }
    }

    stage('Register Task Definition & Deploy') {
      steps {
        script {
          withAWS(credentials: 'aws-ecr-creds', region: "${env.AWS_REGION}") {
            sh '''
              set -euo pipefail

              # capture current task definition
              aws ecs describe-task-definition --task-definition ${TASK_FAMILY} > current-taskdef.json

              # create a "register" JSON by taking taskDefinition and updating the image
              cat current-taskdef.json \
                | jq --arg IMAGE "${IMAGE_URI}" '.taskDefinition
                    | .containerDefinitions[0].image = $IMAGE
                    | del(.taskDefinitionArn, .revision, .status, .requiresAttributes, .compatibilities, .registeredAt, .registeredBy)' \
                > register-taskdef.json

              # register new task definition revision
              aws ecs register-task-definition --cli-input-json file://register-taskdef.json > register-output.json

              NEW_TASK_DEF_ARN=$(jq -r '.taskDefinition.taskDefinitionArn' register-output.json)
              echo "Registered new task definition: ${NEW_TASK_DEF_ARN}"

              # update service to use new task definition and force deployment
              aws ecs update-service --cluster ${ECS_CLUSTER} --service ${ECS_SERVICE} --task-definition ${NEW_TASK_DEF_ARN}

              # Wait for service to become stable
              echo "Waiting for deployment to stabilize..."
              aws ecs wait services-stable --cluster ${ECS_CLUSTER} --services ${ECS_SERVICE}
              echo "Service is stable. Deployment succeeded."
            '''
          }
        }
      }
    }
  } // stages

  post {
    success {
      echo "✅ Deployment complete: ${IMAGE_URI}"
    }
    failure {
      echo "❌ Deployment failed. Check Jenkins console & AWS console."
    }
  }
}
