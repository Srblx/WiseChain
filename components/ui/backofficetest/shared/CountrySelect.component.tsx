// Utils
import countries from '@/utils/data/country';

export interface SelectProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CountrySelect = ({ value, onChange }: SelectProps) => (
  <select
    name="country"
    value={value}
    onChange={onChange}
    className="select select-bordered w-full mb-2"
  >
    <option value="">Sélectionnez un pays</option>
    {countries.map((country, index) => (
      <option key={index} value={country}>
        {country}
      </option>
    ))}
  </select>
);

export default CountrySelect;
