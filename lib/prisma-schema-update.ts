// Add this to your prisma/schema.prisma file:

/*
model Testimonial {
  id         String   @id @default(cuid())
  clientName String   @map("client_name")
  clientTitle String? @map("client_title")
  content    String
  rating     Int      @default(5)
  image      String?
  featured   Boolean  @default(false)
  order      Int      @default(0)
  createdAt  DateTime @default(now()) @map("created_at")
  updatedAt  DateTime @updatedAt @map("updated_at")

  @@map("testimonials")
}
*/
