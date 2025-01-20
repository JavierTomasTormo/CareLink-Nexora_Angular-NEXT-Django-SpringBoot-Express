FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY . .
RUN chmod +x ./gradlew
RUN mkdir -p ~/.gradle /app/.gradle /app/build && chmod -R 777 ~/.gradle /app/.gradle /app/build
ENV GRADLE_USER_HOME=/app/.gradle
ENV GRADLE_OPTS="-Dorg.gradle.daemon=false -Dorg.gradle.parallel=true"
EXPOSE 8085
CMD ["./gradlew", "bootRun", "--no-daemon", "-Dspring-boot.devtools.restart.enabled=true"]