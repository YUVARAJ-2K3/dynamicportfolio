pipeline {
    agent {
        docker {
            image 'node:22'   // Node.js 22 with npm preinstalled
            args '-u root -v /var/run/docker.sock:/var/run/docker.sock' 
            // Run as root + mount Docker socket to build/push images
        }
    }

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
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Install & Build Portfolio') {
            steps {
                sh '''
                    rm -rf node_modules package-lock.json
                    npm cache clean --force
                    npm ci
                    npm run build
                '''
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
