pipeline {
    agent any
    
    environment {
        AWS_REGION = "ap-south-1"
        AWS_ACCOUNT_ID = "<your_account_id>"
        ECR_REPO_NAME = "my-app"
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        EC2_USER = "ec2-user"
        EC2_HOST = "<your_ec2_public_ip>"
        EC2_KEY = "ec2-ssh-key" // Jenkins SSH credential ID
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/<your_username>/<your_repo>.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh """
                        docker build -t ${ECR_REPO_NAME}:${IMAGE_TAG} .
                    """
                }
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

        stage('Tag & Push to ECR') {
            steps {
                sh """
                    docker tag ${ECR_REPO_NAME}:${IMAGE_TAG} ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}:${IMAGE_TAG}
                    docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}:${IMAGE_TAG}
                """
            }
        }

        stage('Deploy on EC2') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} '
                        docker pull ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}:${IMAGE_TAG} &&
                        docker stop ${ECR_REPO_NAME} || true &&
                        docker rm ${ECR_REPO_NAME} || true &&
                        docker run -d --name ${ECR_REPO_NAME} -p 80:80 ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}:${IMAGE_TAG}
                        '
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful! App should be accessible via ALB."
        }
        failure {
            echo "❌ Deployment failed."
        }
    }
}
