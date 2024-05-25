pipeline{
    agent any
    stages{
        stage('Checkout') {
            steps {
                echo 'Checking out code from Git'
                script {
                    checkout([$class: 'GitSCM',
                        branches: [[name: 'main']],  // Replace with your branch
                        userRemoteConfigs: [[url: 'git@github.com:shirasss/Full-Stack-Final-Project-Dockernized.git', credentialsId: 'shira']]
                    ])
                }
            }
        }
        stage("Build"){
            steps{
                echo "rebuilding the app"
                sh "docker-compose up --build -d"
            }
        }
    }
    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
        always {
        sh "docker system prune -af"
        }
    }
}