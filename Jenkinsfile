pipeline {
    agent any

    environment {
        AWS_ACCOUNT_ID = '577638372377'
        AWS_REGION = 'ap-south-1'
        IMAGE_NAME = 'portfolio'
        IMAGE_TAG = 'latest'
        ECR_REPO = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${IMAGE_NAME}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/main']],
                    doGenerateSubmoduleConfigurations: false,
                    extensions: [],
                    submoduleCfg: [],
                    userRemoteConfigs: [[
                        url: 'https://github.com/YUVARAJ-2K3/dynamicportfolio.git'
                    ]]
                ])
            }
        }

        stage('Build Docker Image') {
            steps {
                withAWS(credentials: 'aws-ecr-creds', region: "${AWS_REGION}") {
                    sh '''
                        aws ecr get-login-password --region ${AWS_REGION} \
                        | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                        docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
                        docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${ECR_REPO}:${IMAGE_TAG}
                    '''
                }
            }
        }

        stage('Push to ECR') {
            steps {
                withAWS(credentials: 'aws-ecr-creds', region: "${AWS_REGION}") {
                    sh '''
                        docker push ${ECR_REPO}:${IMAGE_TAG}
                    '''
                }
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                    docker rm -f portfolio-container || true
                    docker run -d --name portfolio-container -p 8080:80 ${ECR_REPO}:${IMAGE_TAG}
                '''
            }
        }
    }
}
