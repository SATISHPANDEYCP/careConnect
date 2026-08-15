const openings = [
  {
    title: 'Frontend Developer Intern',
    type: 'Internship',
    mode: 'Remote / Hybrid',
    description: 'Build responsive React interfaces and improve the patient appointment experience.',
    skills: ['React', 'JavaScript', 'Tailwind CSS'],
  },
  {
    title: 'Backend Developer Intern',
    type: 'Internship',
    mode: 'Remote / Hybrid',
    description: 'Work on secure APIs, appointment workflows and reliable healthcare data services.',
    skills: ['Node.js', 'Express', 'MongoDB'],
  },
  {
    title: 'UI/UX Design Intern',
    type: 'Internship',
    mode: 'Remote',
    description: 'Design simple, accessible experiences for patients, doctors and administrators.',
    skills: ['Figma', 'Prototyping', 'Design Systems'],
  },
]

const benefits = [
  {
    title: 'Real project experience',
    description: 'Contribute to practical healthcare workflows and strengthen your portfolio.',
    icon: 'M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z',
  },
  {
    title: 'Collaborative learning',
    description: 'Learn through code reviews, design discussions and guided implementation.',
    icon: 'M18 18.72a9.1 9.1 0 0 0 3.74-.48 3 3 0 0 0-4.68-2.48m.94 2.96v-.01c0-1.66-.67-3.16-1.76-4.25M9 12.75a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm7.5-4.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM3.75 21a5.25 5.25 0 0 1 10.5 0v.75H3.75V21Z',
  },
  {
    title: 'Flexible environment',
    description: 'Balance academic commitments with clear, achievable project milestones.',
    icon: 'M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  },
]

const Careers = () => {
  return (
    <div className='mx-auto w-full max-w-[1500px] pb-20'>
      <section className='mt-8 overflow-hidden rounded-2xl bg-primary px-6 py-14 text-white sm:px-10 md:py-20 lg:px-20'>
        <div className='max-w-3xl'>
          <span className='inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-medium tracking-wide'>CARECONNECT CAREERS</span>
          <h1 className='mt-6 text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl'>Start your journey in healthcare technology</h1>
          <p className='mt-5 max-w-2xl text-sm leading-6 text-white/85 sm:text-base'>
            Join a student-led project environment where you can learn, collaborate and build meaningful digital healthcare experiences.
          </p>
          <a href='#openings' className='mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-primary transition-transform hover:scale-105'>
            View openings
            <span aria-hidden='true'>↓</span>
          </a>
        </div>
      </section>

      <section className='py-16'>
        <div className='text-center'>
          <p className='text-sm font-medium uppercase tracking-[0.2em] text-primary'>Why CareConnect</p>
          <h2 className='mt-3 text-3xl font-semibold text-[#262626]'>Learn while building something meaningful</h2>
        </div>
        <div className='mt-10 grid gap-5 md:grid-cols-3'>
          {benefits.map((benefit) => (
            <div key={benefit.title} className='rounded-2xl border border-[#DCE3FF] bg-[#F8F9FF] p-7 transition-all hover:-translate-y-1 hover:shadow-md'>
              <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-[#E7EBFF] text-primary'>
                <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' aria-hidden='true'>
                  <path strokeLinecap='round' strokeLinejoin='round' d={benefit.icon} />
                </svg>
              </div>
              <h3 className='mt-5 text-lg font-semibold text-[#262626]'>{benefit.title}</h3>
              <p className='mt-2 text-sm leading-6 text-gray-500'>{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id='openings' className='scroll-mt-8 py-8'>
        <div className='flex flex-col justify-between gap-3 sm:flex-row sm:items-end'>
          <div>
            <p className='text-sm font-medium uppercase tracking-[0.2em] text-primary'>Open positions</p>
            <h2 className='mt-3 text-3xl font-semibold text-[#262626]'>Find your role</h2>
          </div>
          <p className='max-w-md text-sm leading-6 text-gray-500'>Fresher-friendly opportunities designed for students who are ready to learn and contribute.</p>
        </div>

        <div className='mt-8 space-y-4'>
          {openings.map((opening) => (
            <article key={opening.title} className='rounded-2xl border border-gray-200 p-6 transition-all hover:border-[#B7C3FF] hover:shadow-md sm:p-7'>
              <div className='flex flex-col justify-between gap-6 lg:flex-row lg:items-center'>
                <div className='max-w-3xl'>
                  <div className='flex flex-wrap gap-2 text-xs'>
                    <span className='rounded-full bg-[#E7EBFF] px-3 py-1 text-primary'>{opening.type}</span>
                    <span className='rounded-full bg-gray-100 px-3 py-1 text-gray-600'>{opening.mode}</span>
                  </div>
                  <h3 className='mt-4 text-xl font-semibold text-[#262626]'>{opening.title}</h3>
                  <p className='mt-2 text-sm leading-6 text-gray-500'>{opening.description}</p>
                  <div className='mt-4 flex flex-wrap gap-2'>
                    {opening.skills.map((skill) => (
                      <span key={skill} className='rounded-md border border-gray-200 px-3 py-1 text-xs text-gray-500'>{skill}</span>
                    ))}
                  </div>
                </div>
                <a
                  href={`mailto:careconnectowner@gmail.com?subject=${encodeURIComponent(`Application: ${opening.title}`)}`}
                  className='inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-7 py-3 text-sm text-white transition-opacity hover:opacity-90'
                >
                  Apply by email
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className='mt-16 rounded-2xl bg-[#F3F5FF] px-6 py-10 text-center sm:px-10'>
        <h2 className='text-2xl font-semibold text-[#262626]'>How to apply</h2>
        <p className='mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500'>
          Email your resume, portfolio or GitHub profile with a short introduction. Mention the role you are interested in and your current course and year.
        </p>
        <a href='mailto:careconnectowner@gmail.com?subject=CareConnect%20Career%20Application' className='mt-6 inline-flex rounded-full border border-primary px-7 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white'>
          careconnectowner@gmail.com
        </a>
        <p className='mt-5 text-xs text-gray-400'>CareConnect is an academic college project. These opportunities are included for project demonstration purposes.</p>
      </section>
    </div>
  )
}

export default Careers
