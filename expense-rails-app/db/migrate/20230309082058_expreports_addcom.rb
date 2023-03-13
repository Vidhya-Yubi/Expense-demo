class ExpreportsAddcom < ActiveRecord::Migration[7.0]
  def change 
    rename_column :expreports, :description, :content 
    add_column :expreports, :comment, :text

  end
end
