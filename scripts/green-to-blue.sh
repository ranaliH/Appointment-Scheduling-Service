#!/bin/bash
kubectl apply -f green-deployment.yaml
kubectl set image deployment/appointment-scheduling-service-green appointment-scheduling-service=ranaliw/appointment-scheduling-service:${GITHUB_SHA} --record
