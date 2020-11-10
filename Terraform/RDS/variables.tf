variable "identifier"{
  default = "finalproject"
}

variable "name_prefix"{
  default = "fp"
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
  default = "finalproject"
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
  default = ["subnet-0adfe0c49dfad23f7", "subnet-0f7c54ab57732a7cc",]
}

variable "final_snapshot_identifier"{
  default = "final-project-snapshot"
}

variable "vpc_security_group_ids"{
  default = ["sg-0cc525f065ed681cb",]
}
