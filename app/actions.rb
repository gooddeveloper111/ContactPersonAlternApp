# Homepage (Root path)
get '/' do
  erb :index
end

post '/api/new' do
  image = Image.new(
    params[:image]
    )
  if image.save
    image.to_json
  else
    params[:image].to_json
  end
end

get '/api/show' do
  images = Image.all.to_json
end

delete '/api/image' do
  image = Image.find((params[:id].to_i))
  image.destroy
    if image.destroy
      "true".to_json
    else
      "failed".to_json
    end
end


post '/api/image/edit' do

end

