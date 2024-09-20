interface CheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const VerifiedCheckbox = ({ checked, onChange }: CheckboxProps) => (
  <div className="form-control">
    <label className="label cursor-pointer">
      <span className="label-text text-lg">Mail vérifié</span>
      <input
        type="checkbox"
        name="isVerified"
        checked={checked}
        onChange={onChange}
        className="checkbox checkbox-primary"
      />
    </label>
  </div>
);

export default VerifiedCheckbox;
