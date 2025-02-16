import jaconv
import pykakasi
import sys
import json
import re
import io


sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
def kanji_to_romaji(kanji_text):

    kks = pykakasi.kakasi()

    result = kks.convert(kanji_text)

    romaji = "".join([converted_word['passport'] for converted_word in result])

    return romaji

def escape_quotes(s):
    s = s.replace('"', '\\"')
    s = s.replace("'", "\\'")
    return s 

if __name__ == "__main__":
    kanji_json_list = sys.argv[1]
    
    kanji_list = kanji_json_list.strip('[]')
    items = kanji_list.split(',')
    kanji_array_escaped = [escape_quotes(item) for item in items]

    romaji_list = [kanji_to_romaji(item) for item in items]
    
    print(romaji_list)



