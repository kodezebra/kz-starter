interface TeamMember {
  name?: string;
  role?: string;
  bio?: string;
  image?: string;
  twitter?: string;
  linkedin?: string;
}

interface TeamContent {
  title?: string;
  description?: string;
  members?: TeamMember[];
}

interface TeamProps {
  content: TeamContent;
}

export const Team = (props: TeamProps) => {
  const {
    title = "Meet Our Team",
    description = "The talented people behind our success",
    members = [],
  } = props.content;

  const defaultMembers: TeamMember[] = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      bio: "15 years of experience in the industry",
      image: "https://picsum.photos/seed/team1/300/300",
      twitter: "",
      linkedin: "",
    },
    {
      name: "Maria Garcia",
      role: "CTO",
      bio: "Former lead engineer at major tech companies",
      image: "https://picsum.photos/seed/team2/300/300",
      twitter: "",
      linkedin: "",
    },
    {
      name: "James Wilson",
      role: "Head of Design",
      bio: "Award-winning designer with a passion for UX",
      image: "https://picsum.photos/seed/team3/300/300",
      twitter: "",
      linkedin: "",
    },
  ];

  const displayMembers = members.length > 0 ? members : defaultMembers;

  return (
    <section class="bg-white dark:bg-gray-900 py-16 px-4">
      <div class="max-w-screen-xl mx-auto">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-5xl">
            {title}
          </h2>
          <p class="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {displayMembers.map((member, i) => (
            <div
              key={i}
              class="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 text-center group hover:shadow-md transition-shadow"
            >
              <div class="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                <img
                  src={member.image || "https://picsum.photos/seed/person/300/300"}
                  alt={member.name}
                  class="w-full h-full object-cover"
                />
              </div>
              <h3 class="font-bold text-lg mb-1 text-gray-900 dark:text-white">{member.name || "Name"}</h3>
              <p class="text-sm text-blue-600 dark:text-blue-400 mb-3">{member.role || "Role"}</p>
              <p class="text-xs text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{member.bio || "Bio"}</p>
              <div class="flex items-center justify-center gap-2">
                {member.twitter && (
                  <a
                    href={`https://twitter.com/${member.twitter}`}
                    class="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    class="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
