variable "identifier"{
  default = "sfia2"
}

variable "name_prefix"{
  default = "sfia2"
}

variable "rds_identifier"{
  default = "mysql"
}

variable "engine"{
  default = "mysql"
}

variable "engine_version"{
  default = "5.7.31"
}

variable "instance_class"{
  default = "db.t2.micro"
}

variable "storage_type"{
  default = "gp2"
}

variable "allocated_storage"{
  default = "20"
}

variable "rds_storage_encrypted"{
  default = "false"
}

variable "name"{
  default = "sfia2"
}

variable "username"{
  default = "admin"
}
variable "password"{
  default = "password"
}
variable "port"{
  default = "3306"
}

variable "performance_insights_enabled"{
  default = "true"
}

variable "subnet_ids"{
  default = ["subnet-0d7b583cd1364005a","subnet-082247d98286bea47", "subnet-0479408c3118cf863"]
}

variable "final_snapshot_identifier"{
  default = "sfia2-snapshot"
}

variable "vpc_security_group_ids"{
  default = ["sg-0ca594e07c4bc543e",]
}
