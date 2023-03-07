class ExpensesRemoveboolean < ActiveRecord::Migration[7.0]
  def change 
    remove_column :expenses, :status, :boolean 
    add_column :expenses, :status, :string
  end
end
