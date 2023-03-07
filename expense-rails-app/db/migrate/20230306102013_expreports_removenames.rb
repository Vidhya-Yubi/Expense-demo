class ExpreportsRemovenames < ActiveRecord::Migration[7.0]
  def change 
    rename_column :expreports, :tripname, :reportname
    add_column :expreports, :description, :text 
    remove_column :expreports, :from, :string
    remove_column :expreports, :to, :string
    remove_column :expreports, :days, :integer

  end
end
