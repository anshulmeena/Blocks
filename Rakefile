#!/usr/bin/env rake

require 'fileutils'

namespace :blocks do
  task :minify do
    current_path = File.dirname(__FILE__)
    compressor = "java -jar #{current_path}/vendor/plugins/yuicompressor-2.4.6/build/yuicompressor-2.4.6.jar"
    js_list = [ "blocks" ]
    js_path = "#{current_path}/blocks/js"

    Dir.chdir(js_path)

    js_list.each do |js|
      cmd = "#{compressor} --type js #{js}.js -o #{js}.min.js"
      result = system(cmd)
      puts result == true ? "Created #{js_path}/#{js}.min.js" : "ERROR: #{result}"
    end
  end

  task :build do
    current_path = File.dirname(__FILE__)

    Dir.chdir("#{current_path}")
    cmd = "zip -r blocks.zip blocks"
    result = system(cmd)
    puts result == true ? "Created blocks.zip" : "ERROR: #{result}"

  end
end
