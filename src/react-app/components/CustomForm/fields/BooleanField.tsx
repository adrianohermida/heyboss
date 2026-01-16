import React from "react";

interface BooleanFieldProps {
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  error?: string;
}

export const BooleanField: React.FC<BooleanFieldProps> = ({
  value,
  onChange,
  disabled = false,
  error,
}) => {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={value || false}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-700">Confirmar</span>
      </label>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default BooleanField;
