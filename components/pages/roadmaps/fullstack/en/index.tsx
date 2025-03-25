import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/layout/Container";
import Heading from "@/components/ui/Heading";

export default function FullStackEn() {
  return (
    <>
      <PageHeader
        title="Full Stack Developer"
        description="Start your journey to becoming a Full Stack Developer! This roadmap outlines the essential skills and tools needed to become a complete developer, capable of working on both the frontend and backend. Whether you're starting from scratch or looking to level up your skills, follow this clear path to master the full stack development stack."
        breadcrumb={[
          {
            name: "Roadmaps",
            link: "/roadmaps/",
          },
        ]}
      />
      <Container className="pb-10">
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <Heading as="h2" label="1. Learn Programming Fundamentals" />
          <p className="mb-6 leading-[30px]">
            Start with the basics of programming. Learn how to work with
            variables, control structures, functions, and objects using a
            programming language like JavaScript, Python, or Ruby.
          </p>

          <Heading as="h2" label="2. Learn HTML, CSS, and JavaScript" />
          <p className="mb-6 leading-[30px]">
            Master the core technologies for building websites. Learn how to
            structure and style your websites using HTML and CSS, and learn
            JavaScript to add interactivity.
          </p>

          <Heading as="h2" label="3. Version Control (Git)" />
          <p className="mb-6 leading-[30px]">
            Git is essential for version control and collaboration in software
            development. Learn how to use Git to track changes and collaborate
            on your code with others.
          </p>

          <Heading
            as="h2"
            label="4. JavaScript Frameworks (React.js, Vue.js, Angular)"
          />
          <p className="mb-6 leading-[30px]">
            Learn to use JavaScript frameworks like React, Vue.js, or Angular to
            create modern and scalable web applications. Master component
            creation and state management.
          </p>

          <Heading
            as="h2"
            label="5. Backend Development (Node.js, Express.js)"
          />
          <p className="mb-6 leading-[30px]">
            Learn how to build the backend of your applications using Node.js
            and Express.js. Manage databases, handle user authentication, and
            create RESTful APIs to interact with the frontend.
          </p>

          <Heading as="h2" label="6. Databases (SQL and NoSQL)" />
          <p className="mb-6 leading-[30px]">
            Learn how to manage and store data in databases. Master relational
            databases like PostgreSQL and MySQL, and NoSQL databases like
            MongoDB.
          </p>

          <Heading as="h2" label="7. API Development (RESTful and GraphQL)" />
          <p className="mb-6 leading-[30px]">
            Learn to build and consume APIs. Master RESTful APIs and explore
            GraphQL for more efficient data querying and to improve
            frontend-backend interactions.
          </p>

          <Heading as="h2" label="8. Testing (Jest, Mocha, Cypress)" />
          <p className="mb-6 leading-[30px]">
            Testing is essential for ensuring your code works as expected. Learn
            to write unit tests and perform integration testing to catch bugs
            and improve your web applications&apos; reliability.
          </p>

          <Heading
            as="h2"
            label="9. Deployment and Hosting (Netlify, Vercel, AWS)"
          />
          <p className="mb-6 leading-[30px]">
            Learn how to deploy your full stack applications. Master platforms
            like Netlify, Vercel, and AWS to host both your frontend and
            backend, ensuring your app is production-ready.
          </p>

          <Heading as="h2" label="10. DevOps and CI/CD" />
          <p className="mb-6 leading-[30px]">
            Continuous integration and continuous deployment (CI/CD) are key in
            full stack development. Learn how to automate testing, deployment,
            and integration using tools like Jenkins, Travis CI, and GitHub
            Actions.
          </p>

          <Heading as="h2" label="11. Security" />
          <p className="mb-6 leading-[30px]">
            Learn security best practices for full stack development, from
            protecting user data to implementing security policies for both
            frontend and backend applications.
          </p>

          <Heading as="h2" label="12. Stay Up-to-date" />
          <p className="leading-[30px]">
            Full stack development is constantly evolving. Stay updated with the
            latest tools, frameworks, and best practices to stay competitive in
            the industry. Follow blogs, attend events, and participate in the
            community.
          </p>
        </div>
      </Container>
    </>
  );
}
