class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :author
      t.text :description
      t.text :img_url

      t.timestamps
    end
  end
end
