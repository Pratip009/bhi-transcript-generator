/**
 * BRIGHT HORIZON INSTITUTE - Official Transcript Generator
 * Professional Academic Transcript with Static Logo from Public Folder
 */

import React, { useState } from "react";
import { Download, FileText, Award, GraduationCap } from "lucide-react";

const ReportCardGenerator = () => {
  // Static paths from public folder
  const LOGO_PATH = "/logo.png"; // Change this to match your logo filename in public folder
  const SIGNATURE_PATH = "/zeba.png"; // Change this to match your signature filename in public folder

  // Constant institutional data
  const INSTITUTE_INFO = {
    name: "BRIGHT HORIZON INSTITUTE",
    address: "591 Summit Avenue Suite 400",
    city: "Jersey City, NJ 07306",
    telephone: "(973) 732-2128",
    fax: "(973) 255-3900",
    email: "training@brighthorizoninstitute.com",
    program: "Medical Assistant",
    director: "Zeba Fatima",
    directorTitle: "Director",
  };

  const COURSE_LIST = [
    { id: 1, name: "Medical Terminology" },
    { id: 2, name: "Anatomy & Physiology-I" },
    { id: 3, name: "Anatomy & Physiology-II" },
    { id: 4, name: "Hematology" },
    { id: 5, name: "EKG" },
    { id: 6, name: "Microbiology & Urinalysis" },
    { id: 7, name: "Pharmacology" },
    { id: 8, name: "Clinical Procedures" },
    { id: 9, name: "Medical Billing/Coding" },
    { id: 10, name: "Medical Law & Ethics" },
    { id: 11, name: "Management Skills" },
    { id: 12, name: "Medical Office Applications" },
    { id: 13, name: "Human Relations" },
  ];

  const [formData, setFormData] = useState({
    studentName: "",
    ssNumber: "",
    address: "",
    startDate: "",
    graduationDate: "",
    transcriptDate: "",
    courses: COURSE_LIST.map((course) => ({ ...course, marks: "" })),
  });

  const [showPreview, setShowPreview] = useState(false);

  const getGrade = (marks) => {
    const mark = parseFloat(marks);
    if (mark >= 98) return "A+";
    if (mark >= 94) return "A";
    if (mark >= 90) return "A-";
    if (mark >= 87) return "B+";
    if (mark >= 84) return "B";
    if (mark >= 80) return "B-";
    if (mark >= 77) return "C+";
    if (mark >= 74) return "C";
    if (mark >= 70) return "C-";
    if (mark >= 67) return "D+";
    if (mark >= 64) return "D";
    if (mark >= 60) return "D-";
    return "F";
  };

  const getGPA = (marks) => {
    const mark = parseFloat(marks);
    if (mark >= 90) return 4.0;
    if (mark >= 80) return 3.0;
    if (mark >= 70) return 2.0;
    if (mark >= 60) return 1.0;
    return 0.0;
  };

  const calculateTotals = () => {
    const validMarks = formData.courses
      .map((c) => parseFloat(c.marks))
      .filter((m) => !isNaN(m));

    const totalMarks = validMarks.reduce((sum, mark) => sum + mark, 0);
    const avgGPA =
      validMarks.length > 0
        ? (
            validMarks.reduce((sum, mark) => sum + getGPA(mark), 0) /
            validMarks.length
          ).toFixed(2)
        : "0.00";

    return { totalMarks, avgGPA };
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCourseChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      courses: prev.courses.map((course) =>
        course.id === id ? { ...course, marks: value } : course,
      ),
    }));
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  
  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${month}-${day}-${year}`;
  };

  const { totalMarks, avgGPA } = calculateTotals();

  return (
    <div className="min-h-screen bg-gray-200">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap');
        
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-crimson { font-family: 'Crimson Text', serif; }

        @media print {
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 210mm;
            height: 297mm;
            margin: 0;
            box-shadow: none;
          }
          .no-print { display: none !important; }
          @page {
            size: A4;
            margin: 0;
          }
        }

        input:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
        }
      `}</style>

      {!showPreview ? (
        <div className="max-w-6xl mx-auto px-4 py-12 font-inter">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="relative bg-blue-700 p-12 text-center overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full -mr-48 -mt-48"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full -ml-48 -mb-48"></div>
              <div className="relative z-10">
                <h1 className="font-playfair text-5xl font-black text-white mb-3 tracking-tight">
                  {INSTITUTE_INFO.name}
                </h1>
                <p className="text-white/90 text-lg font-semibold tracking-widest uppercase">
                  Official Transcript Generator
                </p>
              </div>
            </div>

            {/* Student Information */}
            <div className="p-8 border-b-2 border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3 font-inter">
                <Award className="text-indigo-600" size={28} />
                Student Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Student Name
                  </label>
                  <input
                    type="text"
                    value={formData.studentName}
                    onChange={(e) =>
                      handleInputChange("studentName", e.target.value)
                    }
                    placeholder="Enter full name"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-800 transition-all hover:border-indigo-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Social Security Number
                  </label>
                  <input
                    type="text"
                    value={formData.ssNumber}
                    onChange={(e) =>
                      handleInputChange("ssNumber", e.target.value)
                    }
                    placeholder="XXX-XX-XXXX"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-800 transition-all hover:border-indigo-400"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Student Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    placeholder="Enter complete address"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-800 transition-all hover:border-indigo-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                    School Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      handleInputChange("startDate", e.target.value)
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-800 transition-all hover:border-indigo-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Graduation Date
                  </label>
                  <input
                    type="date"
                    value={formData.graduationDate}
                    onChange={(e) =>
                      handleInputChange("graduationDate", e.target.value)
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-800 transition-all hover:border-indigo-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Transcript Date
                  </label>
                  <input
                    type="date"
                    value={formData.transcriptDate}
                    onChange={(e) =>
                      handleInputChange("transcriptDate", e.target.value)
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-800 transition-all hover:border-indigo-400"
                  />
                </div>
              </div>
            </div>

            {/* Course Marks */}
            <div className="p-8 border-b-2 border-gray-100 bg-gradient-to-b from-white to-gray-50">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3 font-inter">
                <FileText className="text-indigo-600" size={28} />
                Course Marks
              </h2>

              <div className="bg-blue-500 rounded-xl p-4 mb-4 grid grid-cols-[60px_1fr_150px] gap-4 text-white font-bold text-sm uppercase tracking-wide">
                <div className="text-center">#</div>
                <div>Course Name</div>
                <div className="text-center">Marks (0-100)</div>
              </div>

              <div className="space-y-3">
                {formData.courses.map((course) => (
                  <div
                    key={course.id}
                    className="grid grid-cols-[60px_1fr_150px] gap-4 items-center p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-indigo-400 hover:shadow-lg transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-110 transition-transform">
                      {course.id}
                    </div>
                    <div className="font-semibold text-gray-800 text-base">
                      {course.name}
                    </div>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={course.marks}
                      onChange={(e) =>
                        handleCourseChange(course.id, e.target.value)
                      }
                      placeholder="--"
                      className="px-4 py-3 border-2 border-gray-300 rounded-xl text-center font-bold text-lg text-gray-800 transition-all hover:border-indigo-400"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Summary & Actions */}
            <div className="p-8">
              <div className="bg-blue-500 rounded-2xl p-8 mb-6 shadow-xl">
                <div className="grid md:grid-cols-2 gap-8 text-white">
                  <div className="text-center">
                    <div className="text-sm font-bold uppercase tracking-widest mb-2 opacity-90">
                      Total Marks
                    </div>
                    <div className="text-6xl font-black font-playfair">
                      {totalMarks}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold uppercase tracking-widest mb-2 opacity-90">
                      Average GPA
                    </div>
                    <div className="text-6xl font-black font-playfair">
                      {avgGPA}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowPreview(true)}
                className="w-full py-4 bg-gray-800 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
              >
                <FileText size={24} />
                Generate Transcript
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Print Controls */}
          <div className="no-print max-w-4xl mx-auto px-4 py-6 flex gap-4">
            <button
              onClick={() => setShowPreview(false)}
              className="px-6 py-3 bg-white text-indigo-600 border-2 border-indigo-600 rounded-xl font-bold hover:bg-indigo-600 hover:text-white transition-all shadow-lg"
            >
              ← Back to Form
            </button>
            <button
              onClick={handleDownloadPDF}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2"
            >
              <Download size={20} />
              Download PDF
            </button>
          </div>

          {/* Professional Transcript */}
          <div className="print-area w-[210mm] min-h-[297mm] bg-white mx-auto my-10 p-[12mm] shadow-2xl relative overflow-hidden font-inter">
            {/* Elegant Border Frame */}
            <div className="absolute inset-[5mm] border-2 border-gray-800 pointer-events-none"></div>
            <div className="absolute inset-[6.5mm] border border-gray-400 pointer-events-none"></div>

            {/* Large Watermark */}
            <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.06] pointer-events-none z-0">
              <img
                src={LOGO_PATH}
                alt="Watermark"
                className="w-[500px] h-[500px] object-contain"
              />
            </div>

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center pb-3 mb-4 border-b-2 border-gray-800">
                <img
                  src={LOGO_PATH}
                  alt="Institute Logo"
                  className="w-16 h-16 object-contain mx-auto mb-2"
                />
                <h1 className="font-playfair text-2xl font-bold text-gray-900 mb-1.5 tracking-wide uppercase">
                  {INSTITUTE_INFO.name}
                </h1>
                <div className="text-[9px] text-gray-700 mb-1.5 leading-relaxed font-medium">
                  {INSTITUTE_INFO.address} • {INSTITUTE_INFO.city}
                  <br />
                  Tel: {INSTITUTE_INFO.telephone} • Fax: {INSTITUTE_INFO.fax}
                  <br />
                  Email: {INSTITUTE_INFO.email}
                </div>
                <div className="inline-block border-2 border-gray-800 px-5 py-1 mt-0.5">
                  <div className="font-playfair text-sm font-bold text-gray-900 uppercase tracking-widest">
                    Official Academic Transcript
                  </div>
                </div>
              </div>

              {/* Student Information Table */}
              <div className="mb-4">
                <table className="w-full border-2 border-gray-800">
                  <tbody>
                    <tr className="border-b border-gray-800">
                      <td className="py-1 px-2.5 font-bold text-gray-900 border-r border-gray-800 w-[15%] text-[10px] uppercase">
                        Name:
                      </td>
                      <td className="py-1 px-2.5 text-gray-900 font-semibold text-[10px] border-r border-gray-800 w-[35%]">
                        {formData.studentName}
                      </td>
                      <td className="py-1 px-2.5 font-bold text-gray-900 border-r border-gray-800 w-[15%] text-[10px] uppercase">
                        SS Number:
                      </td>
                      <td className="py-1 px-2.5 text-gray-900 font-semibold text-[10px] w-[35%]">
                        {formData.ssNumber}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-1 px-2.5 font-bold text-gray-900 border-r border-gray-800 text-[10px] uppercase">
                        Address:
                      </td>
                      <td
                        className="py-1 px-2.5 text-gray-900 font-semibold text-[10px] border-r border-gray-800"
                        colSpan="3"
                      >
                        {formData.address}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-1 px-2.5 font-bold text-gray-900 border-r border-gray-800 text-[10px] uppercase">
                        Program:
                      </td>
                      <td className="py-1 px-2.5 text-gray-900 font-semibold text-[10px] border-r border-gray-800">
                        {INSTITUTE_INFO.program}
                      </td>
                      <td className="py-1 px-2.5 font-bold text-gray-900 border-r border-gray-800 text-[10px] uppercase">
                        Entry Date:
                      </td>
                      <td className="py-1 px-2.5 text-gray-900 font-semibold text-[10px]">
                        {formatDisplayDate(formData.startDate)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2.5 font-bold text-gray-900 border-r border-gray-800 text-[10px] uppercase">
                        Graduation:
                      </td>
                      <td
                        className="py-1 px-2.5 text-gray-900 font-semibold text-[10px]"
                        colSpan="3"
                      >
                        {formatDisplayDate(formData.graduationDate)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Academic Record Title */}
              <div className="text-center mb-2.5">
                <h2 className="font-playfair text-base font-bold text-gray-900 uppercase tracking-wider">
                  Academic Record
                </h2>
              </div>

              {/* Grades Table */}
              <table className="w-full mb-4 border border-gray-800">
                <thead>
                  <tr className="bg-transparent text-gray-900 border-b border-gray-800">
                    <th className="py-1.5 px-2 text-center font-extrabold text-[10px] border-r border-gray-700 w-12">
                      S.No.
                    </th>
                    <th className="py-1.5 px-2.5 text-left font-extrabold text-[10px] border-r border-gray-700">
                      Course Name
                    </th>
                    <th className="py-1.5 px-2 text-center font-extrabold text-[10px] border-r border-gray-700 w-16">
                      Marks
                    </th>
                    <th className="py-1.5 px-2 text-center font-extrabold text-[10px] w-20">
                      Grade
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formData.courses.map((course) => {
                    const grade = course.marks ? getGrade(course.marks) : "—";
                    return (
                      <tr
                        key={course.id}
                        className="border-b border-gray-800 bg-transparent"
                      >
                        <td className="py-1 px-2 text-center font-bold text-gray-900 border-r border-gray-800 text-[10px]">
                          {course.id}
                        </td>
                        <td className="py-1 px-2.5 font-semibold text-gray-900 border-r border-gray-800 text-[10px]">
                          {course.name}
                        </td>
                        <td className="py-1 px-2 text-center font-bold text-gray-900 border-r border-gray-800 text-[10px]">
                          {course.marks || "—"}
                        </td>
                        <td className="py-1 px-2 text-center font-black text-gray-900 text-xs w-20">
                          {grade}
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="bg-transparent text-gray-900">
                    <td
                      colSpan="2"
                      className="py-1.5 px-2.5 text-right font-black text-[10px] uppercase border-r border-gray-700"
                    >
                      Total Marks:
                    </td>
                    <td className="py-1.5 px-2 text-center font-black text-xs border-r border-gray-700">
                      {totalMarks}
                    </td>
                    <td className="py-1.5 px-2 text-center font-black text-xs">
                      GPA: {avgGPA}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Grading Scale Table */}
              <div className="mb-3">
                <h3 className="text-center font-bold text-gray-900 mb-1.5 text-[10px] uppercase tracking-wider">
                  Grading Scale
                </h3>
                <table className="w-full border-2 border-gray-800">
                  <tbody>
                    <tr className="bg-transparent">
                      <td className="py-1 px-1.5 text-center font-black text-gray-900 border-r border-gray-800 text-[10px]">
                        A+
                      </td>
                      <td className="py-1 px-1.5 text-center font-semibold text-gray-900 border-r border-gray-800 text-[9px]">
                        98 (4.00)
                      </td>
                      <td className="py-1 px-1.5 text-center font-black text-gray-900 border-r border-gray-800 text-[10px]">
                        A
                      </td>
                      <td className="py-1 px-1.5 text-center font-semibold text-gray-900 border-r border-gray-800 text-[9px]">
                        94 (4.00)
                      </td>
                      <td className="py-1 px-1.5 text-center font-black text-gray-900 border-r border-gray-800 text-[10px]">
                        A-
                      </td>
                      <td className="py-1 px-1.5 text-center font-semibold text-gray-900 border-r border-gray-800 text-[9px]">
                        90 (4.00)
                      </td>
                      <td className="py-1 px-1.5 text-center font-black text-gray-900 border-r border-gray-800 text-[10px]">
                        B+
                      </td>
                      <td className="py-1 px-1.5 text-center font-semibold text-gray-900 border-r border-gray-800 text-[9px]">
                        87 (3.00)
                      </td>
                      <td className="py-1 px-1.5 text-center font-black text-gray-900 border-r border-gray-800 text-[10px]">
                        B
                      </td>
                      <td className="py-1 px-1.5 text-center font-semibold text-gray-900 border-r border-gray-800 text-[9px]">
                        84 (3.00)
                      </td>
                      <td className="py-1 px-1.5 text-center font-black text-gray-900 border-r border-gray-800 text-[10px]">
                        B-
                      </td>
                      <td className="py-1 px-1.5 text-center font-semibold text-gray-900 text-[9px]">
                        80 (3.00)
                      </td>
                    </tr>
                    <tr className="bg-transparent border-t border-gray-800">
                      <td className="py-1 px-1.5 text-center font-black text-gray-900 border-r border-gray-800 text-[10px]">
                        C+
                      </td>
                      <td className="py-1 px-1.5 text-center font-semibold text-gray-900 border-r border-gray-800 text-[9px]">
                        77 (2.00)
                      </td>
                      <td className="py-1 px-1.5 text-center font-black text-gray-900 border-r border-gray-800 text-[10px]">
                        C
                      </td>
                      <td className="py-1 px-1.5 text-center font-semibold text-gray-900 border-r border-gray-800 text-[9px]">
                        74 (2.00)
                      </td>
                      <td className="py-1 px-1.5 text-center font-black text-gray-900 border-r border-gray-800 text-[10px]">
                        C-
                      </td>
                      <td className="py-1 px-1.5 text-center font-semibold text-gray-900 border-r border-gray-800 text-[9px]">
                        70 (2.00)
                      </td>
                      <td className="py-1 px-1.5 text-center font-black text-gray-900 border-r border-gray-800 text-[10px]">
                        D+
                      </td>
                      <td className="py-1 px-1.5 text-center font-semibold text-gray-900 border-r border-gray-800 text-[9px]">
                        67 (1.00)
                      </td>
                      <td className="py-1 px-1.5 text-center font-black text-gray-900 border-r border-gray-800 text-[10px]">
                        D
                      </td>
                      <td className="py-1 px-1.5 text-center font-semibold text-gray-900 border-r border-gray-800 text-[9px]">
                        64 (1.00)
                      </td>
                      <td className="py-1 px-1.5 text-center font-black text-gray-900 border-r border-gray-800 text-[10px]">
                        D-
                      </td>
                      <td className="py-1 px-1.5 text-center font-semibold text-gray-900 text-[9px]">
                        60 (1.00)
                      </td>
                    </tr>
                    <tr className="bg-transparent border-t-2 border-gray-800">
                      <td
                        colSpan="12"
                        className="py-1 px-2 text-center font-bold text-gray-900 text-[9px]"
                      >
                        Pass/Fail Courses: 70% Minimum Passing Grade
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Certification */}
              <div className="border-t-2 border-gray-800 pt-3">
                <p className="text-center text-[9px] text-gray-700 mb-3 font-semibold italic">
                  This is to certify that the above is a true and accurate
                  transcript of the academic record.
                </p>

                <div className="grid grid-cols-2 gap-6">
                  {/* Signature Block */}
                  <div>
                    <div className="mb-0.5 text-[9px] font-bold text-gray-900 uppercase">
                      Authorized Signature:
                    </div>
                    {/* Signature image floats above the underline */}
                    <div className="relative h-14 flex items-end">
                      <img
                        src={SIGNATURE_PATH}
                        alt="Authorized Signature"
                        className="absolute bottom-1 left-0 h-12 object-contain"
                        style={{ maxWidth: "160px" }}
                      />
                    </div>
                    <div className="border-b-2 border-gray-900 mb-0.5"></div>
                    <div className="text-[9px] text-gray-700 font-semibold">
                      Name: {INSTITUTE_INFO.director}
                    </div>
                    <div className="text-[9px] text-gray-700 font-semibold">
                      Title: {INSTITUTE_INFO.directorTitle}
                    </div>
                  </div>

                  {/* Date Block — entered separately in the form */}
                  <div>
                    <div className="mb-0.5 text-[9px] font-bold text-gray-900 uppercase">
                      Date:{" "}
                      <span className="text-sm text-gray-900 font-bold ml-2">
                        {formatDisplayDate(formData.transcriptDate)}
                      </span>
                    </div>
                    <div className="h-14 flex items-end pb-1"></div>
                    <div className="border-b-2 border-gray-900 mb-0.5"></div>
                    <div className="text-[9px] text-gray-700 font-semibold mb-0.5">
                      Official Seal/Stamp
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReportCardGenerator;
