# QA-Final-Project-Specification

### **_Resources_**
* Jira - https://psos11.atlassian.net/secure/RapidBoard.jspa?projectKey=QFPS&rapidView=4

## Contents
* [Project Brief](#project-brief)
* [Project Objectives](#project-objectives)
* [Project Outcome](#project-outcome)
* [Project Installation and Configuration](#project-installation-and-configuration)
* [Project Management](#project-management)
* [Software Development](#software-development)
* [Testing](#testing)
* [Deployment](#deployment)
* [Future Improvements](#future-improvements)
* [Conclusion](#conclusion)

## Project Brief
The application we are tasked to develop is a Spring Boot Help Queue application with full CRUD functionality for practical use as a training aid in the Academy. The concept is a web-hosted application that trainees can access to post help tickets to a publicly accessible help queue. Trainers can then use this queue to recognise who has asked for help and who has been waiting the longest. When a trainee has received the help they need, they can mark the ticket as "Done".

## Project Objectives
* Implement basic CRUD funtionality using Java & SpringBoot
* Create an interactive User Interface using React & JavaScript
* Use Terraform to automate Virtual Machine and RDS instance configuration and creation
* Use Ansible to configure dependancy installation
* CI server to handle the pipeline automation
* Containerise the application services by creating images for each service
* Kubernetes to deploy application using AWS EKS
* Test the application before deployment

![mvp](https://gitlab.com/qacdevops/cne-final-project-specification/-/raw/master/images/cne-mvp.png)

## Project Outcome
The application is a fully functional help ticketing system that allows users to post tickets regarding issues based on a specific topic e.g DevOps. Trainers and other students can post solutions to the tickets which then marks the ticket as completed. The tickets can be also updated if any spelling mistakes are made and can also be deleted entirely if no longer needed.

## Project Installation and Configuration

### 1. Run Terraform & Ansible
Before running the following commands, make sure to setup the VPC with relevant security groups & apply to terraform files.
```
$ terraform init
$ terraform plan
$ terraform apply
```

### 2. Configure Jenkins Pipeline
Add required **credentials** and docker pipeline plugin during configuration. Use provided Jenkins file in repository to run pipeline job.
- `vm_key`: .pem key to access testing vm
- `gcloudLogin`: username and password used to access Google Cloud Kubernetes cluster
- `databaseurl`: Database URI from AWS RDS instance e.g. (jdbc:mysql://(PUT DBURI HERE):3306/(databasename))
- `databaseUsername`: RDS Database username
- `databasePassword`: RDS Database password
Change Public DNS addresses in Jenkinsfile to the VMs you created through Terraform.

### 3. Configure Kubernetes Cluster
Kubernetes Cluster needs to be created through GCloud CLI.

## Project Management
### Jira
![jira](https://i.imgur.com/AwizcmL.jpg)

### Risk Assessment
|                              Risk                             |                                                                                                              Analysis of Risk                                                                                                             | Probability | Severity |                                                                                                       Action                                                                                                       |
|:-------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:-----------:|:--------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| Database password is stored in a  file on a public repository | Anyone with access to the local project repository may be able to locate the database login information and therefore gain access to potentially valuable information aswell as having full control of the functionality of the database. | Likely      | Severe   | Store the database login information as secret credentials on Jenkins  and pass the variables through the script.                                                                                                  |
| AWS Server unexpectedly goes offline                          | AWS as like any other online platform can always have the potential risk of  a temporary server outage causing any related resources such as EC2 instances and RDS database instances to be taken offline.                                | Not Likely  | Low      | AWS has a track record of minimal server outages and can guarantee 99.99% reliability for all of its systems and resources. The performance of EC2 instances can be monitored from the control panel at all times. |
| Accidentally causing merge conflicts on GitHub repository     | Due to working in a team of 4 members, there is a possibiltiy that there may be a conflict while trying to push changes to the repository.                                                                                                | Likely      | Moderate | Ensure to notify team members of any changes you would like to push before making a commit to the repository. Only make commits to the development branch.                                                         |
| Covid-19                                                      | Due to the current climate, there may be potential changes to our working environment or other circumstances that would effect the progress of development.                                                                               | Likely      | Moderate | Keep records of tasks in case of emergency or the event of a team member missing meetings.                                                                                                                         |
| Not meeting deadline for project delivery                     | The MVP for the project is the absolute minimum requirement for the project demonstration. Planning will keep track of progress of the MVP implementation and other important tasks.                                                      | Not Likey   | Low      | Ensure to follow the project planning carefully and implement the MVP before attempting any strech goals or other features.                                                                                        |

## Software Development
### Java & Spring
Similarly to the first individual SFIA project, Java and Spring were used to develop and implement the back-end functionality of the application. Functions were created to handle HTTP requests from the front-end to get information as a JSON format from the RDS database instance using functions within the back-end. 

### ReactJS
React is an open-source JavaScript library for building user interfaces or UI components. It was used to designthe frontend elemets of the application as well as implementing functionality between the front and back-end. The main purpose of React is to be fast, scalable, and simple which corresponds to the purporse of using cloud technologies.

## Testing
![testing](https://i.imgur.com/HCCCRbd.jpg)

## Deployment
![deploy](https://user-content.gitlab-static.net/cc86f76dc227985a62c41eeaebd2016556062f92/68747470733a2f2f692e696d6775722e636f6d2f37757566396b652e706e67)

### AWS
AWS was used as the main hosting provider for our EC2 and RDS instances. AWS offers an affordable but reliable solution to hosting both deployment and testing environments on the cloud. AWS was also used as the database server host to store our MySQL database and table.

### Terraform
Although AWS includes its own GUI configuration interface when creating EC2 instances, it can sometimes become inconsitent over time and hard to maintain especially when you are using several different user groups and configuration settings for different instances. Terraform uses Infrastructure as Code which allows you to create individual, consistent configuration settings for each instance created in a time saving and efficient manner. This means that any instances can be created, managed and destroyed through the CLI using the configuration files created.

### Ansible
Ansible is used for configuration and software deployment. It uses .yaml files to configure deployment settings and hosts. Ansible is a powerful piece of software that uses ssh access to connect to hosts and deploy configuration instructions. It uses an inventory file to store host addresses and variables to use when connecting via SSH to allow for successful authentication. For example, this project uses the playbook to ssh into the testing VM and install the docker and docker-compose dependancies and then shh into the Jenkins VM and configure the Jenkins user.

### Jenkins
Jenkins is a CI server that offers a simple solution to automating continuous integration and delivery using source code. By creating a job and a Jenkinsfile we were able to implement stages of development that included testing and building the application to a testing environment. Jenkins also allowed for the use of secret variable and credential storage so we could pass in sensitive information through variables in the Jenkinsfile. Plugins could also be installed

### Docker
DockerHub was used as the artefact repository to store the application images built through docker. The built images were pushed to the repository so that they could be pulled later through the Jenkins pipeline. This allowed for the application to be containerized which means that all of the dependacies and relevant files for each section of the application e.g. front-end image contained react dependancies, were created as seperate images. This means the application can be deployed onto VMs and various other environments regardless of OS configuration.

### Kubernetes (EKS)
Kubernetes is used to manage the containerized services for automation and deployment. As we are using docker containers for our project deployment solution, we are able to use Kubernetes to deploy these containers into a cluster. A cluster contains a group of hosts that are then stored in pods which store our docker containers and images. This cluster can then configure these different hosts to deploy to a single address to allow users to access the application.

## Future Improvements
* Implement Login Functionality
* Implement Front-end testing using Jest
* Tickets can be sorted by urgency
* Users can tag themselves on tickets to indicate they are having the same issue
* Implement a help queue per cohort, such that trainees can navigate to their cohort to see the help queue specific to their class
* Users can assign trainees and trainers to a help ticket. The trainers/trainees they can assign should be dependent on the current cohort
* Users can update and delete solutions to tickets

## Conclusion
In conclusion, the project that has been developed meets the required MVP objectives and functionality along with several stretch goal features. The project efficiently handles user requests between the front end interactive elements and the back-end functions. A full CI/CD pipeline was integrated into the deployment of the application that includes both testing and the ability to perform a rolling update. Infrastructure management and configuration tools were applied to enable replicability and scalability.

## Authors - Team 2
* Jordan Hamilton - JHamilton@QA.com
* Judith Edhogbo - JEdhogbo@QA.com
* Paulo Silva - PSilva@QA.com
