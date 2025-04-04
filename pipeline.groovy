pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/Tachindu/UMSMearn.git'
        BRANCH = 'main'
        APP_NAME = 'UMSMearn'
        FRONTEND_IMAGE = 'tachindu/devops_frontend:latest'
        BACKEND_IMAGE = 'tachindu/devops_backend:latest'
    }

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Clone Repository') {
            steps {
                retry(3) {
                    git branch: "${BRANCH}", url: "${REPO_URL}"
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'duckerhubpassword', variable: 'DOCKERHUB_PASS')]) {
                    script {
                        if (isUnix()) {
                            sh "docker login -u ndissanayake -p ${DOCKERHUB_PASS}"
                        } else {
                            bat "docker login -u ndissanayake -p ${DOCKERHUB_PASS}"
                        }
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    retry(3) {
                        if (isUnix()) {
                            sh 'docker-compose build'
                        } else {
                            bat 'docker-compose build'
                        }
                    }
                }
            }
        }

        stage('Add tag to Image Frontend') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker tag devops-frontend:latest ndissanayake/devops_frontend:latest'
                    } else {
                        bat 'docker tag devops-frontend:latest ndissanayake/devops_frontend:latest'
                    }
                }
            }
        }

        stage('Add tag to Image Backend') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker tag devops-backend:latest ndissanayake/devops_backend:latest'
                    } else {
                        bat 'docker tag devops-backend:latest ndissanayake/devops_backend:latest'
                    }
                }
            }
        }

        stage('Push Image Frontend') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker push ndissanayake/devops_frontend:latest'
                    } else {
                        bat 'docker push ndissanayake/devops_frontend:latest'
                    }
                }
            }
        }

        stage('Push Image Backend') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker push ndissanayake/devops_backend:latest'
                    } else {
                        bat 'docker push ndissanayake/devops_backend:latest'
                    }
                }
            }
        }

        stage('Deploy Application') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker-compose down'
                        sh 'docker-compose up -d'
                    } else {
                        bat 'docker-compose down'
                        bat 'docker-compose up -d'
                    }
                }
            }
        }
    }
}
