pipeline {
  agent any

  environment {
    REGION             = 'ap-south-1'
    AWS_ACCOUNT        = '577638372377'
    ECR_REPO           = "${AWS_ACCOUNT}.dkr.ecr.${REGION}.amazonaws.com/my-app"
    IMAGE_TAG          = "${env.BUILD_NUMBER}-${env.GIT_COMMIT.take(7)}"
    EC2_USER           = 'ubuntu'
    EC2_HOST           = '52.66.195.236'
    SSH_CREDENTIALS_ID = 'ec2'
    AWS_CREDENTIALS_ID = 'aws-ecr-creds'
  }
   stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/YUVARAJ-2K3/dynamicportfolio.git'
            }
        }

        stage('Login to AWS ECR') {
            steps {
                withAWS(credentials: "${AWS_CREDENTIALS_ID}", region: "${AWS_REGION}") {
                    sh '''
                        aws ecr get-login-password --region ${AWS_REGION} \
                        | docker login --username AWS --password-stdin ${ECR_REPO}
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build -t ${ECR_REPO}:${IMAGE_TAG} .
                '''
            }
        }

        stage('Push Docker Image') {
            steps {
                sh '''
                    docker push ${ECR_REPO}:${IMAGE_TAG}
                '''
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                    docker rm -f ${CONTAINER_NAME} || true
                    docker run -d --name ${CONTAINER_NAME} -p 80:80 ${ECR_REPO}:${IMAGE_TAG}
                '''
            }
        }
    }

    post {
        failure {
            echo 'Pipeline failed!'
        }
        success {
            echo 'Pipeline executed successfully!'
        }
    }
}