# QA-Final-Project-Specification

### **_Resources_**
* Jira - https://psos11.atlassian.net/secure/RapidBoard.jspa?projectKey=QFPS&rapidView=4
* Presentation - 

## Contents
* [Project Brief](#project-brief)
* [Project Objectives](#project-objectives)
* [Project Outcome](#project-outcome)
* [Project Installation and Configuration](#project-installation-and-configuration)
* [Project Management](#project-management)
* [Software Development](#software-development)
* [Deployment](#deployment)
* [Issues](#issues)
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
* Testing?

![mvp](https://gitlab.com/qacdevops/cne-final-project-specification/-/raw/master/images/cne-mvp.png)

## Project Outcome

## Project Installation and Configuration

## Project Management
### Jira

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
### React & JavaScript
### HTML/CSS

## Deployment
![deploy](https://user-content.gitlab-static.net/cc86f76dc227985a62c41eeaebd2016556062f92/68747470733a2f2f692e696d6775722e636f6d2f37757566396b652e706e67)

### AWS
#### Networking
Security is fundamental in a network-based application. Therefore, certain security measures need to be put in place. 
In this project, multiple layers of networking were created.
The first one is the security group which ensures that only the required ports are open.
The next layer is the VPC which creates a network containing the public and the private subnets.
The private subnet contains the CI server and the testing environment.
While the public subnet contains the Kubernetes cluster.
Finally, NGINX was used to proxy-pass the services to a single port so that the user can access the application.

### Terraform
Terraform uses Infrastructure as Code which automates EC2 and RDS instance creation. This means that the end result can be replicated as many times as necessary.
It also ensures that the environment of the instances is consistent. 
In this project two RDS instances and two AWS EC2 instances were created with Terraform.

### Ansible
Ansible is an open source software that is used for configuration and software deployment. It uses .yaml files to configure deployment settings and hosts. Ansible is a powerful piece of software that uses ssh access to connect to hosts and deploy configuration instructions. It uses an inventory file to store host addresses and variables to use when connecting via SSH to allow for successful authentication. For example, this project uses the playbook to ssh into the testing VM and install the docker and docker-compose dependancies and then shh into the Jenkins VM and configure the Jenkins user.
The ip addresses needed by Ansible to ssh into the virtual machines were provided via Terraform during the creation of the environment. This provided an extra feature of automation.
### Jenkins
### Docker
### Kubernetes (EKS)

## Issues

## Future Improvements

## Conclusion

## Authors - Team 2
* Jordan Hamilton
* Judith Edhogbo
* Jullfiqur Rahman
* Paulo Silva
