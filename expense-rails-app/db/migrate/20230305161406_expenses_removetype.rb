class ExpensesRemovetype < ActiveRecord::Migration[7.0]
  def change
    rename_column :expenses, :type, :category
  end
end
