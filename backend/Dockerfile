FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn -q -DskipTests package

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["sh", "-c", "if [ -n \"$DATABASE_URL\" ] && [ -z \"$SPRING_DATASOURCE_URL\" ]; then case \"$DATABASE_URL\" in jdbc:*) export SPRING_DATASOURCE_URL=\"$DATABASE_URL\" ;; *) export SPRING_DATASOURCE_URL=\"jdbc:$DATABASE_URL\" ;; esac; fi; java -jar /app/app.jar"]
