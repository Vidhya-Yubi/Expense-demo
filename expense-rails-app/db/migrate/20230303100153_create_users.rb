class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :password_digest
      t.string :usertype
      t.string :department
      t.string :location
      t.string :emp_id

      t.timestamps
    end
  end
end
