pipeline {
    agent any

    environment {
        AWS_ACCOUNT_ID = '577638372377'
        AWS_REGION     = 'ap-south-1'
        IMAGE_NAME     = 'portfolio'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/YUVARAJ-2K3/dynamicportfolio.git'
            }
        }

        stage('Verify Node & npm Versions') {
            steps {
                sh 'node --version || echo "Node.js not installed"'
                sh 'npm --version || echo "npm not installed"'
            }
        }

        stage('Install & Build Portfolio') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Login to AWS ECR') {
            steps {
                sh '''
                    aws ecr get-login-password --region $AWS_REGION \
                    | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
                '''
            }
        }

        stage('Build & Tag Docker Image') {
            steps {
                sh '''
                    docker build -t $IMAGE_NAME .
                    docker tag $IMAGE_NAME:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$IMAGE_NAME:latest
                '''
            }
        }

        stage('Push to AWS ECR') {
            steps {
                sh '''
                    docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$IMAGE_NAME:latest
                '''
            }
        }

        stage('Deploy to ECS Fargate') {
            steps {
                sh '''
                    aws ecs update-service \
                        --cluster portfolio-cluster \
                        --service portfolio-service \
                        --force-new-deployment \
                        --region $AWS_REGION
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Deployment succeeded!"
        }
        failure {
            echo "❌ Deployment failed. Check logs."
        }
    }
}
