class CreateExpreports < ActiveRecord::Migration[7.0]
  def change
    create_table :expreports do |t|
      t.string :tripname
      t.string :from
      t.string :to
      t.integer :days

      t.references :user, null: false, foreign_key: true


      t.timestamps
    end
  end
end
