pipeline {
    agent any
    
    environment {
        AWS_REGION = "ap-south-1"
        AWS_ACCOUNT_ID = "577638372377"
        ECR_REPO_NAME = "${AWS_ACCOUNT}.dkr.ecr.${REGION}.amazonaws.com/my-app"
        IMAGE_TAG = "${env.BUILD_NUMBER}-${env.GIT_COMMIT.take(7)}"
        EC2_USER = 'ubuntu'  
        EC2_HOST = '52.66.195.236'
        EC2_KEY = "ec2" 
        AWS_CREDENTIALS_ID = 'aws-ecr-creds'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/YUVARAJ-2K3/dynamicportfolio.git'
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
