pipeline {
    agent any

    environment {
        AWS_REGION     = 'ap-south-1'
        AWS_ACCOUNT_ID = '577638372377'
        ECR_REPO_NAME  = 'portfolio'
        IMAGE_TAG      = 'latest'
        CLUSTER_NAME   = 'portfolio-cluster'
        SERVICE_NAME   = 'Portfolio-service'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install & Build Portfolio') {
            steps {
                sh """
                npm install
                npm run build
                """
            }
        }

        stage('Login to AWS ECR') {
            steps {
                withAWS(credentials: 'aws-ecr-creds', region: "${AWS_REGION}") {
                    sh """
                    aws ecr get-login-password --region ${AWS_REGION} \
                        | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                    """
                }
            }
        }

        stage('Build & Tag Docker Image') {
            steps {
                sh """
                docker build -t ${ECR_REPO_NAME}:${IMAGE_TAG} .
                docker tag ${ECR_REPO_NAME}:${IMAGE_TAG} ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}:${IMAGE_TAG}
                """
            }
        }

        stage('Push to AWS ECR') {
            steps {
                sh """
                docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}:${IMAGE_TAG}
                """
            }
        }

        stage('Deploy to ECS Fargate') {
            steps {
                withAWS(credentials: 'aws-ecr-creds', region: "${AWS_REGION}") {
                    sh """
                    aws ecs update-service \
                        --cluster ${CLUSTER_NAME} \
                        --service ${SERVICE_NAME} \
                        --force-new-deployment \
                        --region ${AWS_REGION}
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Portfolio deployed successfully to ECS Fargate!"
        }
        failure {
            echo "❌ Deployment failed. Check logs."
        }
    }
}
