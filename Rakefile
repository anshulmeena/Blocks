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

  task :link_examples do
    current_path = File.dirname(__FILE__)
    blocks_dir   = File.join(current_path, 'blocks')
    examples_dir = File.join(current_path, '..', 'blocks-examples')

    Dir.chdir(examples_dir)
    puts Dir.pwd

    Dir.entries('.').each do |dir|
      next if (dir == '.' || dir == '..') # Skip filesystem dirs
      next unless File.directory?(dir) # Skip non-directories

      example_blocks_dir = File.join(dir, 'blocks')

      unless File.symlink?(example_blocks_dir)
        # Remove existing blocks directory
        if File.exists?(example_blocks_dir)
          Dir.delete(example_blocks_dir)
        end

        # Create a symlink in the example dir to blocks
        File.symlink(blocks_dir, example_blocks_dir)
      end
    end
  end
end
