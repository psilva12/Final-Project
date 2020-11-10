variable "ami" {
  description = "AMI of EC2 instance, default is Ubuntu 18.04"
  default     = "ami-09a1e275e350acf38"
}

variable "instance-count" {
  description = "Number of instance that will need to be spin up"
  default     = "3"
}

variable "instance-type" {
  description = "The type of machine to run the image on"
  default     = "t2.micro"
}


variable "public_key" {
  default = "~/.ssh/id_rsa.pub"
}

variable "private_key"{
  default = "~/.ssh/id_rsa"
}

variable "pem-key" {
  description = "The Key which I will be able to SSH in to my EC2 using"
  default     = "ansible-jenkins"
}

variable "subnet_id" {
  description = "The ID of the subnet which I will deploy EC2 in to"
  // First subnet is private -> Jenkins     Second is public -> Kubernetes
  default     = ["subnet-0edd07884eb30e179", "subnet-0adfe0c49dfad23f7",]
}

variable "vpc_security_group_ids" {
  description = "The IDs of the security group we will attach to the EC2"
  default     = ["sg-0cc525f065ed681cb"]
}

variable "tags" {
  description = "Map of tags"
  default     = ["Jenkins2","Deployment2", "Testing2", ]
}

variable "associate_public_ip_address" {
  description = "Associate Public IP to machines that need public access"
  default     = true
}

