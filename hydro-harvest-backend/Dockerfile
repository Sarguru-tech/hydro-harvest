FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY target/hydro-harvest-backend-1.0.0.jar app.jar

ENV JAVA_TOOL_OPTIONS="-Xms64m -Xmx300m -XX:MaxMetaspaceSize=96m -XX:+UseSerialGC -XX:+ExitOnOutOfMemoryError"

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]