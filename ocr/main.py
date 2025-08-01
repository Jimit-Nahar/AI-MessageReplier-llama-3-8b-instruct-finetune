from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer

# Create a new instance of a ChatBot
bot = ChatBot("MyBot")

# Create a new instance of a ChatBot with a specified storage adapter
# bot = ChatBot("MyBot", storage_adapter="chatterbot.storage.SQLStorageAdapter")

# Create a new instance of a ChatBot with a specified logic adapter
# bot = ChatBot("MyBot", logic_adapters=[
#         {
#             "import_path": "chatterbot.logic.BestMatch",
#             "statement_comparison_function": "chatterbot.comparisons.levenshtein_distance",
#             "response_selection_method": "chatterbot.response_selection.get_most_frequent_response"
#         }
#     ])

# Create a new trainer for the chatbot
trainer = ChatterBotCorpusTrainer(bot)

# Train the chatbot on the English corpus
trainer.train("chatterbot.corpus.english")

# Get a response from the chatbot
response = bot.get_response("Hello, how are you?")

print(response)
