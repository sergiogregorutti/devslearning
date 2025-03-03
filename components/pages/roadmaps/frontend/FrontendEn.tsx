import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/layout/Container";

export default function FrontendEn() {
  return (
    <>
      <PageHeader
        title="Frontend Developer"
        description="Start your journey to becoming a Frontend Developer! This roadmap outlines the essential skills and tools needed to build stunning, responsive websites and web applications. Whether you’re starting from scratch or looking to level up your skills, follow this clear path to master the frontend development stack."
        breadcrumb={[
          {
            name: "Roadmaps",
            link: "/roadmaps/",
          },
        ]}
      />
      <Container>
        <h2>1. Learn HTML & CSS</h2>
        <p className="mb-6">
          HTML is the backbone of web development. Learn to structure your
          content using HTML and style it with CSS to create visually appealing
          websites. Master concepts like the Box Model, Flexbox, Grid, and
          responsive design to ensure your site works across all devices.
        </p>

        <h2>2. Get Comfortable with JavaScript</h2>
        <p className="mb-6">
          JavaScript adds interactivity and dynamic behavior to your websites.
          Learn the fundamentals like variables, functions, and loops, and
          advance to more complex concepts such as DOM manipulation, events, and
          asynchronous programming.
        </p>

        <h2>3. Version Control (Git)</h2>
        <p className="mb-6">
          Git is essential for collaboration and version control in web
          development. Learn the basics of Git, how to commit changes, branch,
          merge, and work with GitHub for team collaboration.
        </p>

        <h2>4. Responsive Design</h2>
        <p className="mb-6">
          Responsive design ensures your websites look great on all screen
          sizes. Learn to use media queries, Fluid Grid layouts, and
          mobile-first design to create flexible and user-friendly web
          interfaces.
        </p>

        <h2>5. CSS Preprocessors (SASS/LESS)</h2>
        <p className="mb-6">
          Preprocessors like SASS and LESS help write cleaner and more efficient
          CSS. Learn how to use variables, nesting, and mixins to streamline
          your CSS workflow and enhance maintainability.
        </p>

        <h2>6. JavaScript Frameworks & Libraries (React.js)</h2>
        <p className="mb-6">
          React.js is a powerful JavaScript library used to build modern web
          apps. Learn how to create reusable components, manage state, and use
          hooks for efficient development and improved performance.
        </p>

        <h2>7. Package Managers (NPM/Yarn)</h2>
        <p className="mb-6">
          Package managers like NPM and Yarn help manage your project
          dependencies. Learn how to install, update, and organize libraries and
          tools, keeping your project efficient and up-to-date.
        </p>

        <h2>8. Build Tools (Webpack/Babel)</h2>
        <p className="mb-6">
          Webpack and Babel are essential for bundling and transpiling your
          code. Understand how to set up these tools to optimize performance and
          ensure compatibility across browsers.
        </p>

        <h2>9. APIs (RESTful and GraphQL)</h2>
        <p className="mb-6">
          Learn how to interact with APIs using HTTP requests. Start with
          RESTful APIs, then move on to GraphQL for querying data more
          efficiently and enabling complex interactions between your frontend
          and backend.
        </p>

        <h2>10. Testing (Jest, Mocha)</h2>
        <p className="mb-6">
          Testing ensures your code runs smoothly and as expected. Learn to
          write unit tests and perform integration testing to catch bugs and
          improve the reliability of your web applications.
        </p>

        <h2>11. Deployment (Netlify, Vercel)</h2>
        <p className="mb-6">
          Learn how to deploy your applications using modern platforms like
          Netlify and Vercel. Master the process of pushing your code to
          production with Continuous Deployment (CD) pipelines and monitor your
          site's performance.
        </p>

        <h2>12. Stay Up-to-date</h2>
        <p className="mb-6">
          Frontend development is constantly evolving. Stay current with the
          latest frameworks, best practices, and tools to ensure you're always
          on top of your game as a frontend developer. Follow blogs, attend
          events, and participate in the community.
        </p>
      </Container>
    </>
  );
}
