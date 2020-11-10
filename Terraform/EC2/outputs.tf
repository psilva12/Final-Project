output "ec2_ip" {
    value = aws_instance.Instances.*.id
}

output "jenkins"{
    value = aws_instance.Instances.0.public_dns
}

output "testvm"{
    value = aws_instance.Instances.1.public_dns
}


