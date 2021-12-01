import { Job, Company } from "@prisma/client";
import SmallButton from "../SmallButton";
import Link from "next/link";
import moment from "moment";
import Navbar from "../Navbar";

type JobPageProps = {
  job: (Job & { company: Company }) | null;
  company: Company | null;
  responsive?: boolean;
  appliedForCurrentJob: boolean | null | undefined;
};

const ApplyPart = (props: {
  appliedForCurrentJob: boolean | null | undefined;
  jobId: number;
}) => {
  if (props.appliedForCurrentJob === null) {
    return <>Loading application data. Please wait...</>;
  } else if (props.appliedForCurrentJob === undefined) {
    return (
      <p className="py-4 text-blue-700 text-2xl">
        Login to apply for this job.
      </p>
    );
  }
  return (
    <>
      {props.appliedForCurrentJob ? (
        <>
          <article className="mb-6 space-y-4">
            <p className="text-red-500 text-xl">
              You have already applied for this job.
            </p>
          </article>
        </>
      ) : (
        <>
          <a href={`/apply/${props.jobId}`}>
            <SmallButton content="Apply for the job" />
          </a>
        </>
      )}
    </>
  );
};

const JobPage = (props: JobPageProps) => {
  // empty page is props are null/invalid
  if (!props.company || !props.job) return <></>;
  const postedAt = new Date(props.job.postedAt);
  return (
    <>
      {props.responsive && <Navbar />}
      <section
        className={`py-12 flex-1 rounded-md max-auto ${
          props.responsive ? "md:px-28" : "hidden lg:block"
        }`}
      >
        <div className="md:pr-2">
          <article className="item-center mb-9 flex justify-between">
            <div className="flex gap-4 mb-6">
              <img
                src={props.company?.logo || ""}
                className="max-h-16"
                alt="Job"
              />
              <div>
                <Link href={`/job/${props.job.id}`}>
                  <a className="mb-1 text-3xl font-bold">
                    {props.job.position}
                  </a>
                </Link>

                <h3 className="mb-1 text-xl font-bold text-blue-500 underline">
                  Company: {props.company?.name}
                </h3>
                <p className="text-muted flex items-center gap-1">
                  <span>
                    <img src="/assets/img/location.svg" alt="Location Icon" />
                  </span>
                  {props.job.location}
                </p>
              </div>
            </div>
            <p className="text-black hidden md:block">
              Posted {moment(postedAt).fromNow()}
            </p>
          </article>
          <p className="text-black md:hidden pl-2 pb-4 text-md">
            Posted {moment(postedAt).fromNow()}
          </p>
          <div className="md:flex mb-9 items-center justify-between p-6 bg-gray-100 rounded-md">
            <article className="pb-5">
              <h2 className="font-bold">Field</h2>
              <p className="text-muted">{props.job?.industry}</p>
            </article>
            <article className="pb-5">
              <h2 className="font-bold">Location</h2>
              <p className="text-muted">{props.job?.location}</p>
            </article>
            <article className="pb-5">
              <h2 className="font-bold">Salary</h2>
              <p className="text-muted">
                {props.job?.salary ? props.job?.salary : "Unpaid Internship"}
              </p>
            </article>
          </div>
          {!props.responsive && (
            <article className="mb-6 space-y-4">
              <a
                className="font-bold text-blue-500 hover:underline"
                href={`/job/${props.job.id}`}
              >
                Full Page View
              </a>
            </article>
          )}
          <article className="mb-6 space-y-4">
            <h3 className="font-bold text-blue-700">Job Overview</h3>
            <p className="text-muted">{props.job?.description}</p>
          </article>
          <article className="mb-6 space-y-4">
            <h3 className="font-bold text-blue-700">Job Requirements</h3>
            {props.job?.skillsRequired.map((skill, x) => (
              <div className="text-muted flex gap-3" key={x}>
                <img src="/assets/img/verified-checkmark.svg" alt="Checkmark" />
                <p>{skill}</p>
              </div>
            ))}
          </article>
          <article className="mb-6 space-y-4">
            <h3 className="font-bold text-blue-700">Company Overview</h3>
            <p className="text-muted">{props.company?.description || ""}</p>
          </article>
          <ApplyPart
            appliedForCurrentJob={props.appliedForCurrentJob}
            jobId={props.job.id}
          />
        </div>
      </section>
    </>
  );
};

export default JobPage;
