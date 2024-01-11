FROM --platform=linux/amd64 openjdk:21
LABEL maintainer="4chiaa"
EXPOSE 8080
ADD backend/target/beenabler.jar beenabler.jar
CMD [ "sh", "-c", "java -jar /beenabler.jar" ]