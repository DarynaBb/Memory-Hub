import arrow from "../assets/images/arrow-forward.svg"
function CardFilter({ filterStatus, setFilterStatus, handleFilterChange }) {
  return (
      <select id="statusFilter" value={filterStatus} onChange={handleFilterChange} className="cursor-pointer card-filter max-w-[200px] md:max-w-[150px] rounded-[8px] border-[1px] border-[#BCC0C1] py-[8px] pl-[16px] text-[1.7em] outline-none">
        <option value="all">All cards</option>
        <option value="not studied">Not Studied</option>
        <option value="need practice">Need Practice</option>
        <option value="mastered">Mastered</option>
        <option value="not studied and need practice">Not Studied and Need Practice</option>
      </select>
  );
}

export default CardFilter;
