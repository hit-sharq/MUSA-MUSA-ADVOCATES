import Image from "next/image"
import { prisma } from "@/lib/prisma"

async function getTeamMembers() {
  return await prisma.teamMember.findMany({
    orderBy: { order: "asc" },
  })
}

export default async function TeamPage() {
  const teamMembers = await getTeamMembers()

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Our Attorneys</h1>
        <p className="section-subtitle">
          Meet the dedicated professionals who make up our legal team. Each member brings unique expertise and a shared
          commitment to providing exceptional legal representation.
        </p>

        <div className="grid grid-3">
          {teamMembers.map((member) => (
            <div key={member.id} className="card team-card">
              <Image
                src={member.image || "/placeholder.svg?height=200&width=200"}
                alt={member.name}
                width={200}
                height={200}
                className="team-image"
                style={{ width: "200px", height: "200px" }}
              />
              <h3>{member.name}</h3>
              <p
                style={{
                  color: "#0a2540",
                  fontWeight: "600",
                  marginBottom: "1rem",
                  fontSize: "1.1rem",
                }}
              >
                {member.title}
              </p>
              <p style={{ textAlign: "left", lineHeight: "1.6" }}>{member.bio}</p>
            </div>
          ))}
        </div>

        {teamMembers.length === 0 && (
          <div className="card" style={{ textAlign: "center", padding: "4rem 2rem" }}>
            <h3>Team Information Coming Soon</h3>
            <p>
              We are currently updating our team information. Please contact us directly to learn more about our legal
              professionals.
            </p>
          </div>
        )}

        <div
          style={{
            background: "linear-gradient(135deg, #0a2540 0%, #1a3a5c 100%)",
            color: "white",
            padding: "3rem 2rem",
            borderRadius: "15px",
            textAlign: "center",
            marginTop: "4rem",
          }}
        >
          <h3 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Join Our Firm</h3>
          <p style={{ fontSize: "1.1rem", marginBottom: "2rem", opacity: "0.9" }}>
            We are always looking for talented legal professionals to join our growing firm. If you are passionate about
            the law and committed to client service, we'd love to hear from you.
          </p>
          <a href="/contact" className="cta-button">
            Contact Us About Opportunities
          </a>
        </div>
      </div>
    </div>
  )
}
