pipeline{
        agent any
        environment {
            app_version = 'v1.4'
            rollback = 'true'
        }
        stages{
            stage('Build Frontend Image'){
                            steps{
                                sh '''
                                ls
                                pwd
                                '''
                                script{
                                    if (env.rollback == 'false'){

                                        // Check which dockerhub to use
                                        image1 = docker.build("judithed/final_project_frontend", "./src/main/resources/final-project-frontend")
                                       // image2 = docker.build("final_project_backend", "./")
                                    }
                                }
                            }
            }
            stage('Tag & Push Frontend Image'){
                            steps{
                                script{
                                    if (env.rollback == 'false'){
                                        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials'){
                                            image1.push("${env.app_version}")
                                           // image2.push("${env.app_version}")
                                        }
                                    }
                                }
                            }
                        }
            stage('Build Backend Image'){
                            steps{
                                withCredentials([string(credentialsId: 'databaseurl', variable: 'my_url'),string(credentialsId: 'databaseUsername', variable: 'my_user'), string(credentialsId: 'databasePassword', variable: 'my_pw'),]){
                                 sh '''
                                 sed -i s+databasepassword+$my_pw+g src/main/resources/application-dev.properties
                                 sed -i s+databaseurl+$my_url+g src/main/resources/application-dev.properties
                                 sed -i s+databaseusername+$my_user+g src/main/resources/application-dev.properties
                                 '''
                                
                                script{
                                    if (env.rollback == 'false'){

                                        // Check which dockerhub to use
                                        //image1 = docker.build("judithed/final_project_backend", "./src/main/resources/final-project-frontend")
                                        image2 = docker.build("judithed/final_project_backend", "./")
                                    }
                                }
                            }
                            }
            }
            stage('Tag & Push Backend Image'){
                            steps{
                                script{
                                    if (env.rollback == 'false'){
                                        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials'){
                                            //image1.push("${env.app_version}")
                                            image2.push("${env.app_version}")
                                        }
                                    }
                                }
                            }
                        }  
       
//             stage('Testing'){
//                 steps{
//                     withCredentials([file(credentialsId: 'vm_key', variable: 'my_key'),string(credentialsId: 'TESTDB_CONNECT', variable: 'connectTest'),string(credentialsId: 'TESTDB_URI', variable: 'testUri'), string(credentialsId: 'DB_PASSWORD', variable: 'pw'), string(credentialsId: 'SECRET_KEY', variable: 'key')]){
//                     sh '''
//
//                     ssh -tt -o StrictHostKeyChecking=no -i $my_key ubuntu@ec2-35-176-194-80.eu-west-2.compute.amazonaws.com << EOF
//
//                     rm -rf sfiaTest
//                     cd sfia2
//                     $connectTest
//                     source database/Create.sql;
//                     exit
//                     sudo docker exec sfia2_frontend_1 pytest --cov application
//                     sudo docker exec sfia2_backend_1 pytest --cov application
//                     rm -rf Tests
//                     mkdir ~/Tests
//
//                     sudo docker exec sfia2_frontend_1 pytest --cov application > ~/Tests/frontendTest.txt
//                     sudo docker exec sfia2_backend_1 pytest --cov application > ~/Tests/backendTest.txt
//
//                     exit
//                     >> EOF
//
//                     '''
//                     // --cov-report term --cov=sfia2 tests/
//                     }
//                 }
//             }
             stage('Deploy') {
                 steps{
                     withCredentials([file(credentialsId: 'vm_key', variable: 'my_key'), string(credentialsId: 'gcloudLogin', variable: 'loginGcloud')]){
                     sh '''

                     ssh -tt -o StrictHostKeyChecking=no -i $my_key ubuntu@ec2-3-8-130-251.eu-west-2.compute.amazonaws.com << EOF
                     sudo service nginx stop

                     rm -rf Final-Project
                     git clone https://github.com/psilva12/Final-Project
                     cd Final-Project
                     git checkout frontend-experimental

                     docker pull judithed/final_project_backend:$app_version
                     docker pull judithed/final_project_frontend:$app_version

                     sudo -E app_version=$app_version docker-compose up -d
                     sudo docker-compose logs

                     sed -i s+app_version+$app_version+g kubectl/backend.yaml kubectl/frontend.yaml

                     $loginGcloud
                     kubectl apply -f kubectl/

                     ls
                     exit
                     >> EOF
                     '''


                     }

                 }
             }

        }
//                     $loginGcloud
//
//                     kubectl apply -f $backendYaml
//                     kubectl apply -f kubectl/
//                     kubectl get services
}
