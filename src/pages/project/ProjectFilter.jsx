import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import PropTypes from "prop-types";

const ProjectFilter = ({
  selectedStack,
  onStackChange,
  search,
  onSearchChange,
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ">
      
      {/* LEFT SIDE – SEARCH */}
      <div className="w-full sm:w-1/4">
        <Input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className=" border-2 border-[#228BE6]"
        />
      </div>

      {/* RIGHT SIDE – FILTER */}
      <div className="w-full sm:w-auto">
        <Select value={selectedStack} onValueChange={onStackChange}>
          <SelectTrigger className="w-full sm:w-[200px] border-2 border-[#228BE6]">
            <SelectValue placeholder="Filter by Stack" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Web">Web</SelectItem>
            <SelectItem value="Android">Android</SelectItem>
            <SelectItem value="Wordpress">Wordpress</SelectItem>
          </SelectContent>
        </Select>
      </div>

    </div>
  );
};

ProjectFilter.propTypes = {
  selectedStack: PropTypes.string,
  onStackChange: PropTypes.func,
  search: PropTypes.string,
  onSearchChange: PropTypes.func,
};

export default ProjectFilter;
