import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

export interface BookSearchResult {
  title: string;
  author: string[];
  isbn?: string[];
  publishYear?: number;
  publisher?: string[];
  coverImage?: string;
}

@Injectable()
export class ExternalApiService {
  private readonly logger = new Logger(ExternalApiService.name);
  private readonly OPEN_LIBRARY_API = 'https://openlibrary.org';

  async searchBooks(query: string): Promise<BookSearchResult[]> {
    try {
      this.logger.log(`Searching books with query: ${query}`);
      
      const response = await axios.get(`${this.OPEN_LIBRARY_API}/search.json`, {
        params: { q: query, limit: 10 },
      });

      return response.data.docs.map((doc: any) => ({
        title: doc.title,
        author: doc.author_name || [],
        isbn: doc.isbn || [],
        publishYear: doc.first_publish_year,
        publisher: doc.publisher || [],
        coverImage: doc.cover_i 
          ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
          : null,
      }));
    } catch (error) {
      this.logger.error('Error fetching from Open Library API', error);
      throw error;
    }
  }

  async getBookByISBN(isbn: string): Promise<BookSearchResult> {
    try {
      const response = await axios.get(`${this.OPEN_LIBRARY_API}/isbn/${isbn}.json`);
      return response.data;
    } catch (error) {
      this.logger.error(`Error fetching book by ISBN: ${isbn}`, error);
      throw error;
    }
  }
}