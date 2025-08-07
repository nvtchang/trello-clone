variable "project_name" {
  description = "Project name for tagging"
  type        = string
  default     = "terraform-lambda"
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"  
}
