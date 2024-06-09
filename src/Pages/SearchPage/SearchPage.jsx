import { Button, Label, Select } from "flowbite-react";
import useDistricts from "../../hooks/useDistricts";
import useUpazilas from "../../hooks/useUpazilas";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState, useRef } from "react";
import Swal from "sweetalert2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const SearchPage = () => {
  const [districts] = useDistricts();
  const [upazilas] = useUpazilas();
  const axiosPublic = useAxiosPublic();
  const [result, setResult] = useState([]);
  const pdfRef = useRef();
  const downloadPDF = () => {
    const input = pdfRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("search_results.pdf");
    });
  };

  // console.log("from tn predata", preData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bloodGroup = e.target.bloodGroup.value;
    const district = e.target.district.value;
    const upazila = e.target.upazila.value;
    const searchedData = {
      bloodGroup: bloodGroup,
      district: district,
      upazila: upazila,
    };
    console.log(searchedData);

    const result = await axiosPublic.get(
      `/search?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`
    );
    console.log("search result", result);
    if (!result.data.length) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `No data found`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (result.data.length > 0) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Match data found`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setResult(result.data);
  };

  return (
    <div className="max-w-xl mx-auto my-10 md:my-20 px-4 md:px-0">
      <h2 className="mb-5 md:mb-10  text-center">
        <span className="text-2xl md:text-3xl lg:text-4xl uppercase font-thin text-[#9F3551] ">
          Search{" "}
        </span>
        <span className="text-2xl md:text-3xl lg:text-4xl uppercase font-bold pb-2 border-b-4 border-[#9F3551] text-[#9F3551] ">
          Donor
        </span>
      </h2>
      <div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* blood group */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="bloodGroup" value="Blood Group" />
            </div>
            <Select id="bloodGroup" name="bloodGroup" required>
              <option disabled value="default">
                Select a category
              </option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </Select>
          </div>
          {/*recipient district */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="district" value="District" />
            </div>
            <Select id="district" name="district" required>
              {districts.map((district) => (
                <option key={district.id} value={district.name}>
                  {district.name}
                </option>
              ))}
            </Select>
          </div>
          {/*recipient upazila */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="upazila" value="Upazila" />
            </div>
            <Select id="upazila" name="upazila" required>
              {upazilas.map((upazila) => (
                <option key={upazila.id} value={upazila.name}>
                  {upazila.name}
                </option>
              ))}
            </Select>
          </div>

          <Button className="w-full failure-button" type="submit">
            Search Donor
          </Button>
        </form>
      </div>
      {/* search result */}
      <div ref={pdfRef}>
        {result.length > 0 && (
          <div className="mt-10">
            <p className="text-xl font-bold text-center mb-5">
              {result.length} Donor Found
            </p>
            {result.map((item) => (
              <div className="bg-red-100 p-5 mb-2" key={item._id}>
                <p>
                  <span className="font-bold">Name:</span> {item.name}
                </p>
                <p>
                  <span className="font-bold">Email:</span> {item.email}
                </p>
              </div>
            ))}
            <Button onClick={downloadPDF} className="mx-auto mt-3">
              Download PDF
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;


