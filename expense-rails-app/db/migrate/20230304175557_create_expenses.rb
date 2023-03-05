class CreateExpenses < ActiveRecord::Migration[7.0]
  def change
    create_table :expenses do |t|

      t.string :invoicenumber
      t.string :type
      t.date :date
      t.float :amount
      t.text :description
      t.boolean :status

      t.references :expreport, null: false, foreign_key: true

      t.timestamps
    end
  end
end
