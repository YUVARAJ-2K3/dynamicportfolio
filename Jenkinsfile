pipeline {
  agent any

  environment {
    REGION = 'ap-south-1'
    AWS_ACCOUNT = '577638372377'
    ECR_REPO = "${AWS_ACCOUNT}.dkr.ecr.${REGION}.amazonaws.com/my-app"
    IMAGE_TAG = "${env.BUILD_NUMBER}-${env.GIT_COMMIT.take(7)}"
    EC2_USER = 'ubuntu'       
    EC2_HOST = '<52.66.195.236/>' 
    SSH_CREDENTIALS_ID = 'ec2'
    AWS_CREDENTIALS_ID = 'aws-ecr-creds' 
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build') {
      steps {
        sh 'docker build -t my-app:latest .'
      }
    }

    stage('Login to ECR') {
      steps {
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: "${AWS_CREDENTIALS_ID}", usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY']]) {
          sh '''
            aws configure set aws_access_key_id "$AWS_ACCESS_KEY_ID"
            aws configure set aws_secret_access_key "$AWS_SECRET_ACCESS_KEY"
            aws configure set region $REGION
            aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT.dkr.ecr.$REGION.amazonaws.com
          '''
        }
      }
    }

    stage('Tag & Push') {
      steps {
        sh '''
          docker tag my-app:latest ${ECR_REPO}:${IMAGE_TAG}
          docker push ${ECR_REPO}:${IMAGE_TAG}
        '''
      }
    }

    stage('Deploy to EC2 via SSH') {
      steps {
        sshagent (credentials: ["${SSH_CREDENTIALS_ID}"]) {
          sh """
            ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} '
              # pull image and restart
              aws ecr get-login-password --region ${REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT}.dkr.ecr.${REGION}.amazonaws.com
              docker pull ${ECR_REPO}:${IMAGE_TAG} || exit 1
              docker stop my-app || true
              docker rm my-app || true
              docker run -d --name my-app --restart unless-stopped -p 80:80 ${ECR_REPO}:${IMAGE_TAG}
            '
          """
        }
      }
    }
  }

  post {
    always {
      echo "Finished build ${env.BUILD_NUMBER}"
    }
  }
}
