interface CheckboxProps {
  checked: boolean;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ checked, onChange, name }: CheckboxProps) => (
  <div className="form-control">
    <label className="label cursor-pointer">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="checkbox checkbox-primary"
      />
    </label>
  </div>
);

export default Checkbox;
