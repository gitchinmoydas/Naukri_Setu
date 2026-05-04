export default function JobCard({ job }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-xl transition duration-300">
      
      {/* Job Title */}
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        {job.title}
      </h2>

      {/* Company */}
      <p className="text-gray-600 font-medium">
        {job.company}
      </p>

      {/* Location */}
      <p className="text-sm text-gray-500 mt-1">
        📍 {job.location}
      </p>

      {/* AI Score */}
      <div className="mt-4 inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
        AI Match Score: {job.matchScore}
      </div>

      {/* Description */}
      <p className="text-gray-600 mt-4 leading-relaxed line-clamp-4">
        {job.description}
      </p>

      {/* Apply Button */}
      <a
        href={job.link}
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Apply Now
      </a>
    </div>
  );
}